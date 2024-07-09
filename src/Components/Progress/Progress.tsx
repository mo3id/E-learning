import { ReactNode, memo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";
const PathLoader = (props: { children: ReactNode }) => {
    NProgress.configure({showSpinner: false});
    const [prevLoc, setPrevLoc] = useState('');
    const location = useLocation();

    useEffect(() => {
        setPrevLoc(location.pathname);
        NProgress.start();

    }, [location]);

    useEffect(() => {
        if (location.pathname === prevLoc) {
            setPrevLoc('');
        }
        NProgress.done();
    }, [prevLoc, location.pathname]);


    return (
        <>
            {props.children}
        </>
    )
}

export default memo(PathLoader);