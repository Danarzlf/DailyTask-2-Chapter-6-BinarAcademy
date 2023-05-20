    // withRouter.js
    import axios from "axios";
    import { useEffect, useState } from "react";
    import {
        useParams,
    } from "react-router-dom";

    const ExpenseDetail = () => {
        const [data, setData] = useState({})
        let params = useParams();

        console.log(params);

        useEffect(() => {
            axios.get(`http://localhost:8000/api/v1/products/${params.id}`)
            .then(function (response) {
                console.log(response.data.data)
                setData(response.data.data)
            })
            .catch(function (error) {
                console.log(error.message)
            })
        }, [setData])    

        console.log(data)

        return (
            <div className="">
                <h1>ini prorduct detial</h1>
                <h1>{data?.product?.name}</h1> 
                <p>{data?.product?.price}</p>
                <p>{data?.product?.stock}</p> 
                {data?.product?.image && <img src={data.product.image} alt="Product Image" style={{ width: "25%" }} />}
            </div>
        )
    }

    export default ExpenseDetail;