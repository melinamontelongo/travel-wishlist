import { createSlice } from '@reduxjs/toolkit'

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    destinations: [],
    chosenDestination: {}
  },
  reducers: {
    //  Add a new destination 
    addDestination: (state, action) => {
      const newDestinations = [...state.destinations, action.payload];
      return{
        ...state,
        destinations: newDestinations
      }
    },
    //  Edit a destination
    updateDestination: (state, action) => {
      const filterDestinations = state.destinations.map(destination => {
        if(destination.id === action.payload.id){
          return destination = {
            id: destination.id,
            name: action.payload.updatedDestination.name,
            description: action.payload.updatedDestination.description,
            picture: action.payload.updatedDestination.picture
          }
        }
        return destination;
      });
      return {
        ...state,
        destinations: filterDestinations
      }
    },
    //  Remove a destination
    removeDestination: (state, action) => {
      return {
        ...state,
        destinations: state.destinations.filter(destination => destination.id !== action.payload)
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { addDestination, updateDestination, removeDestination } = wishlistSlice.actions

export default wishlistSlice.reducer