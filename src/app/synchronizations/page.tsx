"use client";

import {usePathname, useSearchParams} from "next/navigation";
import {listAllSynchronization} from "@/actions/synchronization";
import {ISynchronization} from "@/entities/synchronization";
import {useQuery} from "@tanstack/react-query";
import "./style.scss";
import SynchronizationModal from "@/app/synchronizations/components/SynchronizationModal";
import Link from "next/link";


function SynchronizationsPage() {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const { data: synchronizations, isLoading } = useQuery({
        queryKey: ["synchronizations", searchParams.toString()],
        queryFn: () => listAllSynchronization({
            offset: searchParams.get('offset'),
            limit: searchParams.get('limit'),
            order_by: searchParams.get('order_by'),
            direction: searchParams.get('direction'),
        }),
    });

    if (isLoading) return <p>Loading</p>;

    return (
        <section className="section">
            <h1>Sincronizações Finalizadas <Link href={`?show=true`}>KxAJS</Link> </h1>
            {searchParams.get('show') === 'true' ? <SynchronizationModal /> : <div></div>}
            <table className="table">
                <thead>
                    <tr>
                        <th>Fonte</th>
                        <th>Destino</th>
                        <th>Conector</th>
                        <th>Sucesso</th>
                        <th>Começou Em</th>
                        <th>Terminou Em</th>
                    </tr>
                </thead>
                <tbody>
                    {synchronizations?.map((synchronization: ISynchronization) => (
                        <tr key={synchronization.id}>
                            <td>{synchronization.source}</td>
                            <td>{synchronization.destination}</td>
                            <td>{synchronization.connection}</td>
                            <td>{synchronization.success ? 'Sim' : 'Não'}</td>
                            <td>{synchronization.startedAt}</td>
                            <td>{synchronization.finishedAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default SynchronizationsPage;