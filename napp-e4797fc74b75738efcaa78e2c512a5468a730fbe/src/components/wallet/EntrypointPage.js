import { useIsConnectionRestored } from '@tonconnect/ui-react';

export const EntrypointPage = () => {
    const connectionRestored = useIsConnectionRestored();

    if (!connectionRestored) {
        return <div>Please wait...</div>;
    }

    return ;
};

export default EntrypointPage;