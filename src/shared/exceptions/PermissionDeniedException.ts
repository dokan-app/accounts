/**
 * @class PermissionDeniedException
 */
export class PermissionDeniedException extends Error {
  constructor(msg = 'Permission denied') {
    super(msg);
    this.name = 'PermissionDeniedException';
  }
}
