import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { privateGet } from '../../utilities/apiCaller';


export const fetchRecentTransactions = createAsyncThunk(
    'fetchRecentTransactions',
    async ({ userToken, senderphone }, { rejectWithValue }) => {
        try {
            let url = '/my/transactions';
            if (senderphone) {
                url += `?senderphone=${senderphone}`;
            }
            const response = await privateGet(url, userToken);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const fetchSearchTransactions = createAsyncThunk(
    'fetchSearchTransactions',
    async ({ userToken, senderphone }, { rejectWithValue }) => {
        try {
            let url = '/my/transactions';
            if (senderphone) {
                url += `?senderphone=${senderphone}`;
            }
            const response = await privateGet(url, userToken);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const mytransactionsSlice = createSlice({
    name: 'mytransactions',
    initialState: {
        recentTransactions:[],
        mytransactions: [],
        myOutTransactions: [],
        myInTransactions: [],
        lastTransaction: null,
        isLoading: false,
    },
    reducers: {
        clearLastTransaction: (state) => {
            state.lastTransaction = null;
        },
        clearMyTransaction: (state) => {
            state.mytransactions = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchTransactions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchSearchTransactions.fulfilled, (state, action) => {
                console.log('fetchSearchTransactions fulfilled payload:', action.payload);
                const transactions = action.payload.transactions;
                state.mytransactions = transactions;
                state.lastTransaction = transactions.length > 0 ? transactions[0] : null;
                state.isLoading = false;
            })
            .addCase(fetchSearchTransactions.rejected, (state) => {
                state.isLoading = false;
                state.mytransactions = [];
                state.filteredTransactions = [];
                state.lastTransaction = null;
            })
            .addCase(fetchRecentTransactions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchRecentTransactions.fulfilled, (state, action) => {
                console.log('fetchSearchTransactions fulfilled payload:', action.payload);
                const transactions = action.payload.transactions;
                state.recentTransactions = transactions;
                // state.lastTransaction = transactions.length > 0 ? transactions[0] : null;
                state.isLoading = false;
            })
            .addCase(fetchRecentTransactions.rejected, (state) => {
                state.isLoading = false;
                state.recentTransactions = [];
                state.filteredTransactions = [];
                // state.lastTransaction = null;
            })
    }
});

// Export the action creator
export const { clearLastTransaction,clearMyTransaction } = mytransactionsSlice.actions;

export default mytransactionsSlice.reducer








// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { privateGet} from '../../utilities/apiCaller';
// import axios from "axios";
// export const fetchSearchTransactions = createAsyncThunk(
//     'fetchSearchTransactions ',
//     async ({userToken}, { rejectWithValue }) => {
//         const transactions = await privateGet('/my/transactions',userToken);
//         return transactions;

//     }
// );
// export const fetchOutTransactions = createAsyncThunk(
//     'fetchOutTransactions ',
//     async ({userToken}, { rejectWithValue }) => {
//         const transactions = await privateGet('/my/out/transactions',userToken);
//         return transactions;
//     }
// );
// export const fetchInTransactions = createAsyncThunk(
//     'fetchInTransactions ',
//     async ({userToken}, { rejectWithValue }) => {
//         const transactions = await privateGet('/my/in/transactions',userToken);
//         return transactions;
//     }
// );
// export const mytransactionsSlice = createSlice({
//     name: 'My transactions',
//     initialState:{
//         mytransactions: [],
//         myOutTransactions:[],
//         myInTransactions:[],
//         isLoading: false,
//         previousTransaction: null,
      
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchSearchTransactions.pending, (state) => {
//                 state.isLoading = true
//             })
//             .addCase(fetchSearchTransactions.fulfilled, (state, action) => {
//                 // state.mytransactions = action.payload;
//                 // state.isLoading = false;
//                 // if(action.payload.length>0){
//                 //     state.previousTransaction=action.payload[action.payload.length - 1]
//                 // }
//                 // console.log("payload",action.payload);
//                 // console.log("payload",state.previousTransaction);
//                 console.log('fetchSearchTransactions fulfilled payload:', action.payload);
//                 const transactions = action.payload.transactions;
//                 console.log("transactions",transactions);
//                 state.mytransactions = transactions;
//                 console.log("mytransactions",transactions);
//                 state.previousTransaction = transactions.length > 0 ? transactions[0] : null;
                
//                 state.isLoading = false;
                
//             })
//             .addCase(fetchSearchTransactions.rejected, (state, action) => {
//                 state.isLoading = true
//                 state.mytransactions = [];
//             })
//             .addCase(fetchOutTransactions.pending, (state) => {
//                 state.isLoading = true
//             })
//             .addCase(fetchOutTransactions.fulfilled, (state, action) => {
//                 state.myOutTransactions = action.payload;
//                 state.isLoading = false
                
//             })
//             .addCase(fetchOutTransactions.rejected, (state, action) => {
//                 state.isLoading = true
//                 state.myOutTransactions = [];
//             })
//             .addCase(fetchInTransactions.pending, (state) => {
//                 state.isLoading = true
//             })
//             .addCase(fetchInTransactions.fulfilled, (state, action) => {
//                 state.myInTransactions = action.payload;
//                 state.isLoading = false
                
//             })
//             .addCase(fetchInTransactions.rejected, (state, action) => {
//                 state.isLoading = true
//                 state.myInTransactions = [];
//             })
//     }
// });

// export default mytransactionsSlice.reducer;
