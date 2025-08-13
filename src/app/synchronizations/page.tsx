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
                filters={{
                    'success-true-finished-at-hl': 'Com Sucesso | Finalizado Em (Maior -> Menor)',
                    'success-true-finished-at-lh': 'Com Sucesso | Finalizado Em (Menor -> Maior)',
                    'success-false-finished-at-hl': 'Falhou | Finalizado Em (Maior -> Maior)',
                    'success-false-finished-at-lh': 'Falhou | Finalizado Em (Menor -> Maior)',
                }}
            />
        </Suspense>
    );
}


export default Synchronization;