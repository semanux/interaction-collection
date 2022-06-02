import { defineStore } from "pinia";

type Transcation={
    id:number;
    type:'charge' | 'refund' |'payment'
    amount:number
    status:'pending'|'processed';
}

type BankDetails={
    balance:number
    transactions:Transcation[];
}
export const useBankAccountStore=defineStore('bankAccount',{
    state:()=>{
        return{
            balance: 0,
            transactions: []
        } as  BankDetails;
    },
    getters:{
       processedTransactions:(state)=>state.transactions.filter((t)=>t.status==='processed'),

       pendingTransactions:(state)=>state.transactions.filter((t)=>t.status==='pending'),
       runningBalance(state):number{
        return (this.balance+ this.processedTransactions.map((t)=>t.amount).reduce((acc,curr)=>acc+curr,0, ));
       },
       pendingAmount():number{
           return this.pendingTransactions.map((t)=>t.amount).reduce((acc,curr)=>acc+curr,0)
       }
    },
    actions:{
        charge(amount:number){
            const id=Date.now();
            this.transactions.push({
                id,
                type:'charge',
                amount,
                status:'pending',
            })
            return id;
        },
        rahulpayment(amount:number){
            const id=Date.now();
            this.transactions.push({
                id,
                type:'payment',
                amount:-amount,
                status:'pending',
            })
            return id;
        },
        processTransaction(transactionId:number){
            setTimeout(()=>{
                this.transactions=this.transactions.map((t)=>{
                    if(t.id===transactionId){
                        return{...t, status:'processed'};
                    }
                    return t;
                })
            },5000)
        }
    }
})

