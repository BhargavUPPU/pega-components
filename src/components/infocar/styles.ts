import styled from 'styled-components';

export const StyledWrapper = styled.div`
  padding: 16px;
  border-radius: 8px;
  background-color: ${({ theme }: any) => theme?.color?.background || '#f4f5f7'};
  border: 1px solid #dfe1e6;
`;
