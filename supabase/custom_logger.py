
import logging
import coloredlogs


logger = logging.getLogger(__name__)
coloredlogs.install(level='DEBUG', logger=logger)

logging.getLogger("urllib3").setLevel(logging.CRITICAL)
logging.getLogger("httpx").setLevel(logging.CRITICAL)
