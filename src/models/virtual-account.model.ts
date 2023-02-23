import { Schema, model } from 'mongoose'

const virtualAccountSchema = new Schema(
  {
    merchant_id: {
      type: String,
    },
    terminal_id: {
      type: String,
      required: false,
    },
    account_number: {
      type: String,
      required: true,
      unique: true,
    },
    account_name: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: false,
    },
    meta: {
      type: Object,
      required: false,
      default: null,
    },
  },
  {
    collection: 'virtual_accounts',
    autoIndex: true,
    timestamps: true,
    toJson: {
      virtuals: true,
      getters: true,
    },
  },
)

export const VirtualAccount = model('VirtualAccount', virtualAccountSchema)

export default VirtualAccount
