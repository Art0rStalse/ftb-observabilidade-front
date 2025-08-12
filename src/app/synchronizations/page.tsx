import TablePage from "@/components/TablePage/TablePage";
import {ISynchronization} from "@/entities/synchronization";
import SynchronizationTbody from "@/components/TablePage/components/SynchronizationTbody";
import {Suspense} from "react";
import Loading from "@/components/Loading/loading";

function Synchronization() {
    return (
        <Suspense fallback={<Loading />}>
            <TablePage<ISynchronization>
                endpoint="synchronization"
                columns={['Fonte', 'Destino', 'Conector', 'Sucesso', 'Começou Em', 'Terminou Em']}
                Row={SynchronizationTbody}
                title="Sincronizações"
            />
        </Suspense>
    );
}


export default Synchronization;