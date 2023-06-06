export declare class PaymentGateway {
    id: number;
    status: string;
    amount: number;
    description: string;
    transaction: string;
    txn_ref: string;
    payment_url: string;
    callback_url: string;
    created_at: Date;
    updated_at: Date;
    secure_hash: string;
}
