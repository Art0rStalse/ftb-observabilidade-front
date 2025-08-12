import TablePage from "@/components/TablePage/TablePage";
import {Suspense} from "react";
import Loading from "@/components/Loading/loading";
import {ISchema} from "@/entities/schema";
import SchemaTbody from "@/components/TablePage/components/SchemaTbody";

function Schema() {
    return (
      <Suspense fallback={<Loading />}>
          <TablePage<ISchema>
              endpoint="schema"
              columns={['Descrição', 'Conector', 'Modificado em']}
              Row={SchemaTbody}
              title="Mudanças nos Schemas"
          />
      </Suspense>
    );
}

export default Schema;