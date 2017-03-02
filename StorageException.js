import {BaseException} from './BaseException';

export default class StorageException extends BaseException {
	notFound(container) {
		return console.log(this, `${container} not found`);
	}
}
