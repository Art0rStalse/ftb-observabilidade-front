"use client";

import {ISynchronization} from "@/entities/synchronization";

function SynchronizationTbody({ data }: { data: ISynchronization }) {
    return (
        <tr>
            <td>{data.source}</td>
            <td>{data.destination}</td>
            <td>{data.connection}</td>
            <td>{data.success ? 'Sim' : 'Não'}</td>
            <td>{new Date(data.startedAt).toLocaleString()}</td>
            <td>{new Date(data.finishedAt).toLocaleString()}</td>
        </tr>
    );
}

export default SynchronizationTbody;