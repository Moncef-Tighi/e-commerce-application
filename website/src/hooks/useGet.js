import { useEffect, useState } from "react"
import axios from "axios"


export default function useGet(url, defaultData=null, token){

    const [data,setData] = useState(defaultData)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)
    if (token) {var header = { headers : {
        "Authorization" : `Bearer ${token}`
        }}
    }
    useEffect(() => {(
        async function(){

            try{
                setLoading(true)
                const response = await axios.get(url,header )
                setData(response.data)
                setError(false);
            }catch(error){
                if (defaultData) setData(defaultData)
                if (error.code==="ERR_NETWORK") return setError(`Impossible de se connecter au serveur`);
                if (error.code==="ERR_BAD_RESPONSE") return setError(`La base de donnée mets trop de temps à répondre`);
                if (error.code==="ERR_BAD_REQUEST") return setError("Impossible d'effectuer cette opération");
                setError(`Erreur : ${error.message}`);
            }finally{
                setLoading(false)
            }
        }
    )()
    }, [url, defaultData, token])

    return { data, error, loading, token }

}
