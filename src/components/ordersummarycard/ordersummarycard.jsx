import React from 'react';
import { Card, CardContent, CardHeader, Typography, Grid, Divider, Flex } from '@pega/cosmos-react-core';
import PropTypes from 'prop-types';

/**
 * OrderSummaryCard component for Pega Constellation DX.
 * Displays a summary of order items, taxes, shipping, and total.
 */
export default function OrderSummaryCard(props) {
  const { getPConnect } = props;
  const pConn = getPConnect();
  const {
    label = 'Order Summary',
    items = [],
    subtotal = 0,
    tax = 0,
    shipping = 0,
    total = 0,
    currency = 'USD'
  } = pConn.getConfigProps();

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD'
    }).format(val || 0);
  };

  return (
    <Card>
      <CardHeader title={<Typography variant='h2'>{label}</Typography>} />
      <CardContent>
        <Grid container spacing={2} direction='column'>
          {items.length > 0 ? (
            items.map((item, index) => (
              <Grid item key={`item-${index}`}>
                <Flex justifyContent='space-between'>
                  <Typography variant='body1'>
                    {item.name} {item.quantity ? `(x${item.quantity})` : ''}
                  </Typography>
                  <Typography variant='body1'>
                    {formatCurrency(item.price * (item.quantity || 1))}
                  </Typography>
                </Flex>
              </Grid>
            ))
          ) : (
            <Grid item>
              <Typography variant='body2' color='secondary'>
                No items in order.
              </Typography>
            </Grid>
          )}

          <Divider />

          <Grid item>
            <Flex justifyContent='space-between' margin='0.25rem 0'>
              <Typography variant='body2'>Subtotal</Typography>
              <Typography variant='body2'>{formatCurrency(subtotal)}</Typography>
            </Flex>
            <Flex justifyContent='space-between' margin='0.25rem 0'>
              <Typography variant='body2'>Tax</Typography>
              <Typography variant='body2'>{formatCurrency(tax)}</Typography>
            </Flex>
            <Flex justifyContent='space-between' margin='0.25rem 0'>
              <Typography variant='body2'>Shipping</Typography>
              <Typography variant='body2'>{formatCurrency(shipping)}</Typography>
            </Flex>
          </Grid>

          <Divider />

          <Grid item>
            <Flex justifyContent='space-between' margin='0.5rem 0'>
              <Typography variant='h3' weight='bold'>
                Total
              </Typography>
              <Typography variant='h3' weight='bold'>
                {formatCurrency(total)}
              </Typography>
            </Flex>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

OrderSummaryCard.defaultProps = {
  getPConnect: () => ({
    getConfigProps: () => ({})
  })
};

OrderSummaryCard.propTypes = {
  getPConnect: PropTypes.func
};