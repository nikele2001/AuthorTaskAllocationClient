import { helper } from '@ember/component/helper';

export default helper(function formatDate([date]) {
    if (date) {
        return date.substring(0, 10);
    }
    return '';
});
