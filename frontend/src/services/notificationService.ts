import { ElNotification } from "element-plus";
import i18n from "@/config/i18n";

const { t } = i18n.global;

const notify = {
  success() {
    ElNotification({
      title: t("success"),
      message: t("successMessage"),
      type: "success",
    });
  },
  error(entity: string) {
    ElNotification({
      title: t("error"),
      message: t("errorMessage", { entity }),
      type: "error",
    });
  },
  warning(entity: string) {
    ElNotification({
      title: t("warning"),
      message: t("warningMessage", { entity }),
      type: "warning",
    });
  },
};

export default notify;
