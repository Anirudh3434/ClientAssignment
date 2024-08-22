import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
    name: 'address',
    initialState: [],
    reducers: {
        addAddress(state, action) {
            state.push({
                id: state.length + 1,
                houseFlatBlock: action.payload.houseFlatBlock,
                apartmentRoadArea: action.payload.apartmentRoadArea,
                selectedOption: action.payload.selectedOption,
            });
        },
        updateAddress(state, action) {
            const { id, houseFlatBlock, apartmentRoadArea, selectedOption } = action.payload;
            const existingAddress = state.find(address => address.id === id);
            if (existingAddress) {
                existingAddress.houseFlatBlock = houseFlatBlock;
                existingAddress.apartmentRoadArea = apartmentRoadArea;
                existingAddress.selectedOption = selectedOption;
            }
        },
        removeAddress(state, action) {
            return state.filter(address => address.id !== action.payload);
        },
    },
});

export const { addAddress, updateAddress, removeAddress } = addressSlice.actions;
export default addressSlice.reducer;
