"use server";
import 'server-only';
import {IResponse} from "@/entities/response";

interface ListAllProps {
    limit: number;
    offset: number;
    filter_by?: string | null;
    order_by?: string | null;
    direction?: string | null;
    endpoint: string;
}

export async function listAll<T>(
    {
        offset,
        limit,
        order_by,
        filter_by,
        direction,
        endpoint
    }: ListAllProps
): Promise<IResponse<T>> {
    const params = new URLSearchParams();

    params.append('limit', String(limit));
    params.append('offset', String(offset));

    if (order_by) {
        params.append('order_by', order_by);
        params.append('direction', direction ?? 'asc');
    }

    // filter_by always overwrite order_by
    if (filter_by) {
        params.append('filter_by', filter_by);
        params.delete('direction');
        params.delete('order_by');
    }

    const queryString = params.toString();
    const url = `${process.env.API_URL}/${endpoint}/${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, { method: "GET" });
    return response.json();
}