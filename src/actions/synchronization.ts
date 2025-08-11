"use server";
import 'server-only';
import {ISynchronization} from "@/entities/synchronization";

interface ListAllSynchronizationProps {
    limit?: string | null;
    offset?: string | null;
    order_by?: "startedAt" | "finishedAt" | "success" | null | string;
    direction?: "asc" | "desc" | null | string;
}

export async function listAllSynchronization(
    {
        offset,
        limit,
        order_by,
        direction
    }: ListAllSynchronizationProps
): Promise<ISynchronization[]> {
    const limitDefault = process.env.LIMIT_DEFAULT ?? '';
    const offsetDefault = process.env.OFFSET_DEFAULT ?? '';

    const params = new URLSearchParams();

    if (limit !== undefined || limitDefault !== undefined) {
        params.append('limit', limit ?? limitDefault);
    }

    if (offset !== undefined || offsetDefault !== undefined) {
        params.append('offset', offset ?? offsetDefault);
    }

    if (order_by) {
        params.append('order_by', order_by);
        params.append('direction', direction ?? 'asc');
    }

    const queryString = params.toString();
    const url = `${process.env.API_URL}/synchronization/${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, { method: "GET" });
    const data: ISynchronization[] = await response.json();

    data.map((item: ISynchronization) => {
        const formattedFinishedAt = new Date(item.finishedAt);
        const formattedStartedAt = new Date(item.startedAt);

        item.finishedAt = formattedFinishedAt.toLocaleString();
        item.startedAt = formattedStartedAt.toLocaleString();
    })

    return data;
}