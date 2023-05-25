import { BindingScope, injectable } from "@loopback/core"
import { log4js, Log4jsLogger } from "../components/Log4jsComponent"
import { Repository, typeorm } from "@loopback/typeorm"
import { Version } from "../entities/version.model"

@injectable({ scope: BindingScope.TRANSIENT })
export class UpgradeService {
    constructor(
        @log4js.logger()
        private readonly logger: Log4jsLogger,
        @typeorm.repository(Version)
        private readonly versionRepo: Repository<Version>
    ) {}

    async getAll() {
        const all = await this.versionRepo.find()
        this.logger.info(JSON.stringify(all))
    }
}
