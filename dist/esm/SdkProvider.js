import * as React from 'react';
import constate from 'constate';
function useSdk({ sdk }) {
    const sdkMemo = React.useMemo(()=>sdk, []);
    return sdkMemo;
}
export const [SdkProvider, useSdkContext] = constate(useSdk);
