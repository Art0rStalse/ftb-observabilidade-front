import { ReadonlyURLSearchParams } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import "./FilterAndNavigation.scss";
import {MouseEvent, useEffect, useState} from "react";

interface FilterAndNavigationProps {
    searchParams:  ReadonlyURLSearchParams;
    router: AppRouterInstance;
    pathname: string;
    totalPages: number;
    page: number;
    filters: Record<string, string>;
}

function FilterAndNavigation({router, searchParams, pathname, page, totalPages, filters}: FilterAndNavigationProps) {
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        const filterBy= params.get('filter_by');

        if (filterBy && Object.keys(filters).includes(filterBy)) setSelectedFilter(filterBy);

    }, [filters, searchParams]);

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    const handleFilterBy = (e: MouseEvent<HTMLDivElement>) => {
        const content = (e.target as HTMLDivElement).getAttribute('data-value');
        const params = new URLSearchParams(searchParams.toString());

        if (content) {
            params.set('filter_by', content.toString());
            router.push(`${pathname}?${params.toString()}`);
        }
    }

    const handleResetFilter = (): void => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('filter_by');
        setSelectedFilter(null);

        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="filter-and-navigation">
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(Math.max(1, page - 1))}
                    disabled={page <= 1}
                    className="navigation"
                >
                    Anterior
                </button>

                <span>Página {page} de {totalPages}</span>

                <button
                    onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                    disabled={page >= totalPages}
                    className="navigation"
                >
                    Próxima
                </button>
            </div>
            {Object.keys(filters).length > 0 ?
                <div className="filter-by">
                    <h4>Filtrar Por</h4>
                    <div className="dropdown">
                        <button className="dropdown-button">{selectedFilter ? filters[selectedFilter] : 'Nenhum'}</button>
                        <div className="dropdown-content">
                            {Object.keys(filters).map(key => (
                                <div
                                    key={key}
                                    className={`${selectedFilter == key ? 'selected' : ''}`}
                                    onClick={selectedFilter == key ? undefined : handleFilterBy}
                                    data-value={key}
                                    aria-disabled={selectedFilter == key}
                                >{filters[key]}</div>
                            ))}
                        </div>
                    </div>
                    {selectedFilter ?
                        <button className="reset-filter-button" onClick={handleResetFilter}>Resetar Filtro</button> : null}
                </div>
                : null}
        </div>
    )
}

export default FilterAndNavigation;