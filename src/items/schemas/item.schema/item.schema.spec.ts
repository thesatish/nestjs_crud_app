import { ItemSchema } from './item.schema';

describe('ItemSchema', () => {
  it('should be defined', () => {
    expect(new ItemSchema()).toBeDefined();
  });
});
