import {useEffect, useMemo, useState} from "react";
import Spinner from "../Components/UI/Spinner/Spinner";
import {useDispatch, useSelector} from "react-redux";

const withErrorHandler = (WrappedComponent, axios) => {
    return function ErrorHandlerHOC(props) {
        const dispatch = useDispatch();
        const [error, setError] = useState(null);
        const loading = useSelector(state => state.loading);

        const icIdReq = useMemo(() => {
            return axios.interceptors.request.use(req => {
                    // setLoading(true);
                    console.log('запрос отправлен');
                    return req;
                },
                // error => {
                //     console.log('[IN HOC interceptor]');
                //     setError(error);
                //     throw error;
                // }
            );
        }, []);

        const icIdRes = useMemo(() => {
            return axios.interceptors.response.use(res => {
                    console.log('запрос получен');
                    return res;
                },
                error => {
                    console.log('[IN HOC interceptor]');
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

        const dismiss = () => {
            setError(null);
        };

        console.log(axios.interceptors);


            return (
                <>
                    {loading ? <Spinner/> : null}
                    <WrappedComponent {...props} />
                </>
            )

    };

};

export default withErrorHandler;