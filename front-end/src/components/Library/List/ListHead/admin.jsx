import React from 'react';

function AdminHead() {
  return (
    <tr className="text-sm text-gray-700">
      <th className="font-normal">Id</th>
      <th className="font-normal">Nome</th>
      <th className="font-normal">E-mail</th>
      <th className="font-normal">Tipo</th>
      <th className="font-normal">Excluir</th>
    </tr>
  );
}

export default AdminHead;
