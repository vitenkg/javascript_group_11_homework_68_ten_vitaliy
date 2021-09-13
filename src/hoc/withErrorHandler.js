import {useEffect, useMemo, useState} from "react";
import Spinner from "../Components/UI/Spinner/Spinner";
import {useSelector} from "react-redux";

const withErrorHandler = (WrappedComponent, axios) => {
    return function ErrorHandlerHOC(props) {
        const [error, setError] = useState(null);
        const loading = useSelector(state => state.loading);

        const icIdReq = useMemo(() => {
            return axios.interceptors.request.use(req => {
                    return req;
                },
            );
        }, []);

        const icIdRes = useMemo(() => {
            return axios.interceptors.response.use(res => {
                    return res;
                },
                error => {
                    setError(error);
                    throw error;
                }
            );
        }, []);

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(icIdReq)
                axios.interceptors.response.eject(icIdRes);

            }
        }, [icIdRes, icIdReq]);


            return (
                <>
                    {loading ? <Spinner/> : null}
                    <WrappedComponent {...props} />
                </>
            )

    };

};

export default withErrorHandler;