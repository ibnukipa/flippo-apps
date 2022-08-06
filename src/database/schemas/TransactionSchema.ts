import Realm from 'realm';

export const TransactionSchemaName = 'Transaction';

const TransactionSchema: Realm.ObjectSchema = {
  name: TransactionSchemaName,
  primaryKey: 'id',
  properties: {
    id: 'string',
    amount: 'int',
    unique_code: 'int',
    status: 'string',
    sender_bank: 'string',
    account_number: 'string',
    beneficiary_name: 'string',
    beneficiary_bank: 'string',
    remark: 'string',
    created_at: 'date',
    completed_at: 'date',
    fee: 'int',
    grand_total: 'int',
  },
};

export default TransactionSchema;
