import { CanIChangeStatus } from './canIChangeStatus';

describe('CanIChangeStatus', () => {
  let service: CanIChangeStatus;

  beforeEach(async () => {
    service = new CanIChangeStatus();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should return true', () => {
      const todoId = 123;
      const result = service.execute(todoId);
      expect(result).toBeTruthy();
    });
  });
});
