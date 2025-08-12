import { ReadonlyURLSearchParams } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import "./style.scss";
import {MouseEvent} from "react";

interface FilterAndNavigationProps {
    searchParams:  ReadonlyURLSearchParams;
    router: AppRouterInstance;
    pathname: string;
    totalPages: number;
    page: number;
}

function FilterAndNavigation({router, searchParams, pathname, page, totalPages}: FilterAndNavigationProps) {


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
            <div className="filter-by">
                <h4>Filtrar Por</h4>
                <div className="dropdown">
                    <button className="dropdown-button">Filtro</button>
                    <div className="dropdown-content">
                        <div onClick={handleFilterBy} data-value='success-true'>Com Sucesso</div>
                        <div onClick={handleFilterBy} data-value='success-false'>Sem Sucesso</div>
                        <div onClick={handleFilterBy} data-value='started-at-hl'>Criado Em (Maior &gt; Menor)</div>
                        <div onClick={handleFilterBy} data-value='started-at-lh'>Criado Em (Menor &gt; Maior)</div>
                        <div onClick={handleFilterBy} data-value='finished-at-hl'>Finalizado Em (Maior &gt; Menor)</div>
                        <div onClick={handleFilterBy} data-value='finished-at-lh'>Finalizado Em (Menor &gt; Maior)</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterAndNavigation;