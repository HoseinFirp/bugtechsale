import axios from "axios"
import { useUser } from "../features/user/userSlice";

function Submit() {
    const user =useUser()

    const req = async()=>{
        try{
            const {data} = await axios.post(
                'http://kzico.runflare.run/order/submit',
                {
                    orderItems:[
                        {product: '64254d33735379f41dad936e',qty:2},
                        {product: '6362a84eb90ac8bc6100a979',qty:2}
                    ],shippingAddress : {
                        address: 'iran tehran valiasr st.',
                        city:'tehran',
                        postalCode:'646552465',
                        phone:'09120000000'
                    },
                    paymentMethod: 'ship',
                    shippingPrice: '5',
                    totalPrice: 3,
                },
                {
                    headers:{
                        Authorization:
                        `Bearer ${user.token}`
                    }
                }
            );
            console.log(data)
        }catch(error){
            console.log(error.response.data)
        }
    }
    return (
        <div>
            <button onClick={req}>submit</button>
        </div>
    )
}

export default Submit
