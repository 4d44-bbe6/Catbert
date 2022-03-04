/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as dotenv from 'dotenv';

dotenv.config();

export const PORT = parseInt(process.env.PORT!);
export const MONGODB_ATLAS_USER = process.env.MONGODB_ATLAS_USER!;
export const MONGODB_ATLAS_PASSWORD = process.env.MONGODB_ATLAS_PASSWORD!;
export const MQTT_SERVER = process.env.MQTT_SERVER!;
export const SCALE_TOPIC = process.env.SCALE_TOPIC!;
