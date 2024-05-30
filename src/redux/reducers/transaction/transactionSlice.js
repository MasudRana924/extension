import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { privateGet } from '../../utilities/apiCaller';

export const fetchtransactions = createAsyncThunk(
    'fetchtransactions',
    async ({ userToken }, { rejectWithValue }) => {
        try {
            const response = await privateGet('/my/transactions', userToken);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const fetchOutTransactions = createAsyncThunk(
    'fetchOutTransactions',
    async ({ userToken }, { rejectWithValue }) => {
        try {
            const response = await privateGet('/my/out/transactions', userToken);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const fetchInTransactions = createAsyncThunk(
    'fetchInTransactions',
    async ({ userToken }, { rejectWithValue }) => {
        try {
            const response = await privateGet('/my/in/transactions', userToken);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const mytransactionsSlice = createSlice({
    name: 'mytransactions',
    initialState: {
        mytransactions: [],
        myOutTransactions: [],
        myInTransactions: [],
        lastTransaction: null,
        isLoading: false,
    },
    reducers: {
        clearLastTransaction: (state) => {
            state.lastTransaction = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchtransactions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchtransactions.fulfilled, (state, action) => {
                console.log('fetchtransactions fulfilled payload:', action.payload);
                const transactions = action.payload.transactions;
                state.mytransactions = transactions;
                state.lastTransaction = transactions.length > 0 ? transactions[0] : null;
                state.isLoading = false;
            })
            .addCase(fetchtransactions.rejected, (state) => {
                state.isLoading = false;
                state.mytransactions = [];
                state.lastTransaction = null;
            })
            .addCase(fetchOutTransactions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchOutTransactions.fulfilled, (state, action) => {
                console.log('fetchOutTransactions fulfilled payload:', action.payload);
                const transactions = action.payload.transactions;
                state.myOutTransactions = transactions;
                state.lastTransaction = transactions.length > 0 ? transactions[0] : null;
                state.isLoading = false;
            })
            .addCase(fetchOutTransactions.rejected, (state) => {
                state.isLoading = false;
                state.myOutTransactions = [];
                state.lastTransaction = null;
            })
            .addCase(fetchInTransactions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchInTransactions.fulfilled, (state, action) => {
                console.log('fetchInTransactions fulfilled payload:', action.payload);
                const transactions = action.payload.transactions;
                state.myInTransactions = transactions;
                state.lastTransaction = transactions.length > 0 ? transactions[0] : null;
                state.isLoading = false;
            })
            .addCase(fetchInTransactions.rejected, (state) => {
                state.isLoading = false;
                state.myInTransactions = [];
                state.lastTransaction = null;
            });
    }
});

// Export the action creator
export const { clearLastTransaction } = mytransactionsSlice.actions;

export default mytransactionsSlice.reducer








// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { privateGet} from '../../utilities/apiCaller';
// import axios from "axios";
// export const fetchtransactions = createAsyncThunk(
//     'fetchtransactions ',
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
//             .addCase(fetchtransactions.pending, (state) => {
//                 state.isLoading = true
//             })
//             .addCase(fetchtransactions.fulfilled, (state, action) => {
//                 // state.mytransactions = action.payload;
//                 // state.isLoading = false;
//                 // if(action.payload.length>0){
//                 //     state.previousTransaction=action.payload[action.payload.length - 1]
//                 // }
//                 // console.log("payload",action.payload);
//                 // console.log("payload",state.previousTransaction);
//                 console.log('fetchtransactions fulfilled payload:', action.payload);
//                 const transactions = action.payload.transactions;
//                 console.log("transactions",transactions);
//                 state.mytransactions = transactions;
//                 console.log("mytransactions",transactions);
//                 state.previousTransaction = transactions.length > 0 ? transactions[0] : null;
                
//                 state.isLoading = false;
                
//             })
//             .addCase(fetchtransactions.rejected, (state, action) => {
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
