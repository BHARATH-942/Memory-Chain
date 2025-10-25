from pyteal import *

# Global state keys
MEMORY_OWNER = Bytes("owner")
UNLOCK_TIME = Bytes("unlock_time")
HEIR = Bytes("heir")

def approval_program():
    is_creator = Txn.sender() == Global.creator_address()
    is_owner = Txn.sender() == App.globalGet(MEMORY_OWNER)
    is_heir = Txn.sender() == App.globalGet(HEIR)
    unlocked = Global.latest_timestamp() > App.globalGet(UNLOCK_TIME)

    # On creation, set owner and unlock_time
    on_creation = Seq([
        App.globalPut(MEMORY_OWNER, Txn.sender()),
        App.globalPut(UNLOCK_TIME, Btoi(Txn.application_args[0])),
        App.globalPut(HEIR, Txn.application_args[1]),
        Approve()
    ])

    # Read memory: only owner, heir, or anyone after unlock_time
    can_read = Or(is_owner, is_heir, unlocked)

    # Transfer ownership to heir (inheritance)
    transfer_ownership = Seq([
        App.globalPut(MEMORY_OWNER, App.globalGet(HEIR)),
        Approve()
    ])

    # Mint NFT (dummy logic, expand as needed)
    mint_nft = Approve()

    program = Cond(
        [Txn.application_id() == Int(0), on_creation],
        [Txn.on_completion() == OnComplete.NoOp, If(Txn.application_args[0] == Bytes("read"), If(can_read, Approve(), Reject()))],
        [Txn.on_completion() == OnComplete.NoOp, If(Txn.application_args[0] == Bytes("transfer"), If(is_owner, transfer_ownership, Reject()))],
        [Txn.on_completion() == OnComplete.NoOp, If(Txn.application_args[0] == Bytes("mint_nft"), If(is_owner, mint_nft, Reject()))],
        [Txn.on_completion() == OnComplete.UpdateApplication, If(is_creator, Approve(), Reject())],
        [Txn.on_completion() == OnComplete.DeleteApplication, If(is_creator, Approve(), Reject())],
        [Txn.on_completion() == OnComplete.CloseOut, Approve()],
        [Txn.on_completion() == OnComplete.OptIn, Approve()]
    )
    return program

def clear_program():
    return Approve()

if __name__ == "__main__":
    print(compileTeal(approval_program(), mode=Mode.Application, version=6))
    print(compileTeal(clear_program(), mode=Mode.Application, version=6))
