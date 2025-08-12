"use client";

import {usePathname, useSearchParams, useRouter} from "next/navigation";
import {listAll} from "@/actions/generics";
import {useQuery} from "@tanstack/react-query";
import "./style.scss";
import Loading from "@/components/Loading/loading";
import { JSX } from "react";
import FilterAndNavigation from "@/components/TablePage/components/FilterAndNavigation";

interface TablePageProps<T> {
    endpoint: string;
    columns: string[];
    title: string;
    Row: ({data}: { data: T }) => JSX.Element;
}

function TablePage<T extends { id: string }>({endpoint, columns, Row, title}: TablePageProps<T>) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const page = Number(searchParams.get('page') ?? process.env.NEXT_PUBLIC_OFFSET_DEFAULT);
    const pageSize = Number(searchParams.get('pageSize') ?? process.env.NEXT_PUBLIC_LIMIT_DEFAULT);
    const offset = (page - 1) * pageSize;

    const {data: data, isLoading} = useQuery({
        queryKey: [`${endpoint}`, searchParams.toString()],
        queryFn: () => listAll<T>({
            offset: offset,
            limit: pageSize,
            order_by: searchParams.get('order_by'),
            direction: searchParams.get('direction'),
            endpoint: `${endpoint}`,
        }),
    });

    const totalPages = Math.ceil((data?.total || 0) / pageSize);

    return (
        <section className="section">
            <h1>{title}</h1>
            {isLoading ? <small></small> :
                <FilterAndNavigation
                    router={router}
                    searchParams={searchParams}
                    page={page}
                    totalPages={totalPages}
                    pathname={pathname}
                />}
            <table className="table">
                <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column}>{column}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {isLoading ?
                    <tr>
                        <td className="loading" colSpan={6}><Loading /></td>
                    </tr> : data?.results.map((d: T) => <Row key={d.id} data={d}/>
                    )}
                </tbody>
            </table>
        </section>
    )
}

export default TablePage;