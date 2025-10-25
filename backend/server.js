require('dotenv').config();
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const algosdk = require('algosdk');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow requests from frontend
// In-memory store for uploaded memories
const memories = [];
const upload = multer(); // memory storage

// Algod client
const ALGOD_SERVER = process.env.ALGOD_SERVER;
const ALGOD_PORT = process.env.ALGOD_PORT || '';
const ALGOD_TOKEN = process.env.ALGOD_TOKEN || '';
const algodClient = new algosdk.Algodv2(
  { 'X-API-Key': ALGOD_TOKEN }, // header for PureStake; if using local node change accordingly
  ALGOD_SERVER,
  ALGOD_PORT
);

// helper: instantiate account from mnemonic
function accountFromMnemonic(mnemonic) {
  const sk = algosdk.mnemonicToSecretKey(mnemonic);
  return sk; // {addr, sk}
}

// route: upload file -> IPFS -> store CID on Algorand note
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded (field name: file)' });

    // 1) Upload to IPFS via Tatum
    const tatumUrl = 'https://api-eu1.tatum.io/v3/ipfs';
    const form = new FormData();
    form.append('file', req.file.buffer, { filename: req.file.originalname });

    const tatumResp = await axios.post(tatumUrl, form, {
      headers: {
        ...form.getHeaders(),
        'x-api-key': process.env.TATUM_API_KEY
      },
      maxBodyLength: Infinity
    });

    const tatumData = tatumResp.data || {};
    const cid = tatumData.ipfsHash || tatumData.cid || (tatumData[0] && tatumData[0].hash) || tatumData.url || null;
    if (!cid) {
      return res.status(500).json({ error: 'Tatum upload succeeded but CID not found in response', tatumData });
    }
    const normalizedCid = typeof cid === 'string' && cid.includes('/ipfs/') ? cid.split('/ipfs/').pop() : cid;

    // 2) Create Algorand transaction storing CID in note field
    const sender = accountFromMnemonic(process.env.ACCOUNT_MNEMONIC);
    const senderAddr = sender.addr;
    const suggestedParams = await algodClient.getTransactionParams().do();
    const noteObj = {
      type: 'memory-chain:store',
      cid: normalizedCid,
      filename: req.file.originalname,
      timestamp: new Date().toISOString()
    };
    const noteBytes = new TextEncoder().encode(JSON.stringify(noteObj));
    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: senderAddr,
      to: senderAddr,
      amount: 0,
      suggestedParams,
      note: noteBytes
    });
    const signedTxn = txn.signTxn(sender.sk);
    const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
    const confirmedTxn = await waitForConfirmation(algodClient, txId, 4);
    // Store memory in in-memory array
    memories.push({
      cid: normalizedCid,
      filename: req.file.originalname,
      txId,
      timestamp: noteObj.timestamp
    });
    return res.json({
      success: true,
      cid: normalizedCid,
      txId,
      confirmedRound: confirmedTxn['confirmed-round'] || null,
      note: noteObj
    });
  } catch (err) {
    console.error('Upload error:', err.response ? err.response.data : err.message || err);
    return res.status(500).json({
      error: 'Server error during upload or on-chain storage',
      details: err.response ? err.response.data : err.message
    });
  }
});

// helper: wait for confirmation (from Algorand docs)
// Endpoint to list uploaded memories
app.get('/memories', (req, res) => {
  res.json(memories);
});
async function waitForConfirmation(client, txId, timeoutRounds = 10) {
  const status = await client.status().do();
  let currentRound = status['last-round'];
  const startRound = currentRound;
  const endRound = startRound + timeoutRounds;
  while (currentRound < endRound) {
    const pending = await client.pendingTransactionInformation(txId).do();
    if (pending['confirmed-round'] && pending['confirmed-round'] > 0) {
      return pending;
    }
    await client.statusAfterBlock(currentRound + 1).do();
    currentRound++;
  }
  throw new Error(`Transaction not confirmed after ${timeoutRounds} rounds`);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
