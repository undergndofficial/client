import React, { useCallback, useEffect, useState } from 'react';
import { Container } from './style';
import { useTranslation } from 'react-i18next';
import useRequest from 'hooks/useRequest';
import { IRole } from 'types/db';
import { getRoleList } from 'api/common';

/**
 * 검색 팝업 컴포넌트
 */
function AddProducerPopup({
  closeAddPopup,
  onClickHandler,
}: {
  closeAddPopup: () => void;
  onClickHandler: (label: string, rolesSeq: number) => void;
}) {
  const { t } = useTranslation();
  const [roles, setRoles] = useState<IRole[]>([]);
  const requestRoleInfo = useRequest<IRole[]>(getRoleList);
  useEffect(() => {
    requestRoleInfo()
      .then((data) => {
        setRoles(data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const onClickRole = useCallback(
    (role: IRole) => {
      onClickHandler(role.rolesKoName, role.rolesSeq);
      closeAddPopup();
    },
    [onClickHandler, closeAddPopup],
  );

  return (
    <Container
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {roles.map((role) => (
        <div
          onClick={() => {
            onClickRole(role);
          }}
          key={role.rolesSeq}
        >
          {role.rolesKoName}
        </div>
      ))}
    </Container>
  );
}

export default AddProducerPopup;
