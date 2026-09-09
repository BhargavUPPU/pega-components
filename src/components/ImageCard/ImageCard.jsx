import React from 'react';
import { Card, CardHeader, CardContent, CardMedia, Typography, Button, Flex } from '@pega/cosmos-react-core';
import PropTypes from 'prop-types';

/**
 * Pega Extensions Image Card Component
 * A production-ready image card for use within Constellation DX views.
 */
const PegaExtensionsImageCard = (props) => {
  const {
    imageSrc,
    altText,
    title,
    description,
    actionLabel,
    onActionClick,
    getPConnect,
    variant = 'standard',
    testId = 'image-card'
  } = props;

  /**
   * Handles the primary action button click.
   * If an onActionClick prop is provided, it is invoked.
   * Otherwise, if configured via PConnect, it could trigger standard Pega actions.
   */
  const handleAction = () => {
    if (onActionClick) {
      onActionClick();
    } else if (getPConnect) {
      const pConn = getPConnect();
      const actionsApi = pConn.getActionsApi();
      // Typically, custom action triggers would go here if provided in config.json metadata
    }
  };

  return (
    <Card variant={variant} data-testid={testId}>
      {imageSrc && (
        <CardMedia
          src={imageSrc}
          alt={altText || title || 'Card Image'}
          height="160px"
        />
      )}
      <CardHeader
        title={<Typography variant="h2">{title}</Typography>}
      />
      <CardContent>
        <Flex direction="column" gap={2}>
          {description && (
            <Typography variant="body">
              {description}
            </Typography>
          )}
          {actionLabel && (
            <Button
              variant="primary"
              onClick={handleAction}
              aria-label={actionLabel}
            >
              {actionLabel}
            </Button>
          )}
        </Flex>
      </CardContent>
    </Card>
  );
};

PegaExtensionsImageCard.defaultProps = {
  imageSrc: '',
  altText: '',
  title: '',
  description: '',
  actionLabel: '',
  variant: 'standard',
  testId: 'image-card'
};

PegaExtensionsImageCard.propTypes = {
  /** Image URL */
  imageSrc: PropTypes.string,
  /** Accessibility alt text */
  altText: PropTypes.string,
  /** Main heading */
  title: PropTypes.string,
  /** Body content text */
  description: PropTypes.string,
  /** Label for the call to action button */
  actionLabel: PropTypes.string,
  /** Custom callback for button click */
  onActionClick: PropTypes.func,
  /** PConnect object provided by the Constellation orchestration */
  getPConnect: PropTypes.func,
  /** Cosmos Card variant */
  variant: PropTypes.oneOf(['standard', 'interactive']),
  /** Test identifier */
  testId: PropTypes.string
};

export default PegaExtensionsImageCard;