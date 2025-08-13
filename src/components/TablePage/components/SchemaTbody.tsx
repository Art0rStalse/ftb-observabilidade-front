"use client";

import {ISchema} from "@/entities/schema";

function SchemaTbody({ data }: { data: ISchema }) {
    return (
        <tr>
            <td>{data.description}</td>
            <td>{data.connection}</td>
            <td>{new Date(data.changedAt).toLocaleString()}</td>
        </tr>
    )
}

export default SchemaTbody;