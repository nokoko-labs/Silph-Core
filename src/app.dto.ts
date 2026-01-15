/**
 * Example DTO to demonstrate Swagger CLI plugin auto-generation.
 * The plugin will automatically generate Swagger documentation
 * without needing @ApiProperty() decorators.
 */
export class HealthCheckDto {
  /**
   * Status message
   * @example "OK"
   */
  status: string;

  /**
   * Timestamp of the health check
   * @example "2024-01-01T00:00:00.000Z"
   */
  timestamp: string;
}
