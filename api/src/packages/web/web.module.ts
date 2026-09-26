import { Module } from '@nestjs/common';
import {ServeStaticModule} from "@nestjs/serve-static";
import {FRONTEND_DIST, PUBLIC_PATH} from "../../shared/const.js";

@Module({
    imports: [
        ServeStaticModule.forRoot(
            {
                rootPath: FRONTEND_DIST,
                exclude: ['/api/{*path}', '/public/{*path}'],
            },
            {
                rootPath: PUBLIC_PATH,
                serveRoot: "/public",
                exclude: ['/api/{*path}'],
                serveStaticOptions: { index: false, fallthrough: false },
            }
        ),
    ]
})
export class WebModule {}
