import React from 'react';
import { Flex, Text } from '@pega/cosmos-react-core';
import { StyledWrapper } from './styles';

declare const PCore: any;

export function CogniCheckBox_Extensions_infocar(props: any) {
  const { getPConnect, label = 'infocar', value } = props;
  const pConn = getPConnect ? getPConnect() : null;

  return (
    <StyledWrapper>
      <Flex direction="column" gap={2}>
        <Text variant="h3">{label}</Text>
        <Text>{value || 'Pega Custom DX Component Rendered Successfully'}</Text>
      </Flex>
    </StyledWrapper>
  );
}

export default CogniCheckBox_Extensions_infocar;
