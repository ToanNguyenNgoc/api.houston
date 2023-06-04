import { DocumentBuilder, SwaggerCustomOptions } from "@nestjs/swagger";
import { name } from '../common'

export const options = new DocumentBuilder()
  .setTitle('Api')
  .setDescription('The API description')
  .setVersion('1.0')
  .addTag('banners')
  // .addTag('blogs')
  .addTag('branches')
  .addTag('galleries')
  .addTag('villa_cates')
  .addTag('villas')
  .addTag('villa_galleries')
  .addTag('villa_rooms')
  .addTag('bookings & bookings customer')
  .addTag('payment_gateways')
  .addTag('system')
  .addTag('accounts')
  .addTag('roles')
  .addTag('permissions')
  .addTag('media')
  .addTag('channel_logs')
  .addTag('customer_originals')
  .addTag('customers')
  .addTag('revenues')
  .addTag('companies')
  .addTag('company_contacts')
  .addTag('company_socials')
  .addTag('provinces & map places')
  .addApiKey({
    type: 'apiKey',
    name: 'x-api-key',
    in: 'header'
  },
    'x-api-key'
  )
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    name.JWT,
  )
  .build();
export const customOptions: SwaggerCustomOptions = {
  customSiteTitle: 'BTX'
}