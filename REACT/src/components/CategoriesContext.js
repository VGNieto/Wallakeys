import React, { useContext, useEffect,createContext,useState } from 'react';
import axios from 'axios';

export const CategoriesContext = createContext();

export const CategoriesProvider = (props) => {



    const [categories,setCategories] = useState(
      
        []


    );

    


    return (
        <CategoriesContext.Provider value={[categories,setCategories]}>
            {props.children}
        </CategoriesContext.Provider>
    );


}



