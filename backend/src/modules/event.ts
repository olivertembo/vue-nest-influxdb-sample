import { Controller, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudAuth,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Event } from 'src/entities/event.entity';

@Injectable()
export class EventService extends TypeOrmCrudService<Event> {
  constructor(@InjectRepository(Event) repo) {
    super(repo);
  }
}

@Crud({
  model: {
    type: Event,
  },
  query: {
    sort: [
      {
        field: 'created_at',
        order: 'DESC',
      },
    ],
  },
})
@ApiBearerAuth('JWT')
@CrudAuth({
  property: 'user',
  filter: (user: any) => ({
    user_id: user?.id,
  }),
})
@ApiTags('events')
@Controller('events')
export class EventController implements CrudController<Event> {
  constructor(public service: EventService) {}

  get base(): CrudController<Event> {
    return this;
  }

  @Override()
  getMany(@ParsedRequest() req: CrudRequest) {
    return this.base.getManyBase(req);
  }

  @Override()
  getOne(@ParsedRequest() req: CrudRequest) {
    return this.base.getOneBase(req);
  }

  @Override()
  deleteOne(@ParsedRequest() req: CrudRequest) {
    return this.base.deleteOneBase(req);
  }

  @Override()
  updateOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: Event) {
    return this.base.updateOneBase(req, dto);
  }

  @Override()
  createOne(
    @Req() request: any,
    @ParsedBody() dto: Event,
    @ParsedRequest() req: CrudRequest,
  ) {
    // const userId = request.user?.id;
    // dto.user_id = userId;

    return this.base.createOneBase(req, dto);
  }
}
