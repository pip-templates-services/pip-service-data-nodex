// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2015 gRPC authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// !!!Important note!!!
//    When regenerating the files in the "protos" folder using "npm run protogen", 
//    you will need to manually change the following lines in entities_v1_pb.js 
//    for PagingParams to work correctly:
//
//        proto.entities_v1.PagingParams.prototype.getSkip = function() {
//          return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0)); // Change this default value of 0 to null
//        };
//
//        proto.entities_v1.PagingParams.prototype.getTake = function() {
//          return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0)); // Change this default value of 0 to null
//        };
//
//        proto.entities_v1.PagingParams.toObject = function(includeInstance, msg) {
//          var f, obj = {
//            skip: jspb.Message.getFieldWithDefault(msg, 1, 0), // Change this default value of 0 to null
//            take: jspb.Message.getFieldWithDefault(msg, 2, 0), // Change this default value of 0 to null
//            total: jspb.Message.getBooleanFieldWithDefault(msg, 3, false)
//        };
//
'use strict';
var grpc = require('grpc');
var entities_v1_pb = require('./entities_v1_pb.js');

function serialize_entities_v1_EntitiesPageReply(arg) {
  if (!(arg instanceof entities_v1_pb.EntitiesPageReply)) {
    throw new Error('Expected argument of type entities_v1.EntitiesPageReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_entities_v1_EntitiesPageReply(buffer_arg) {
  return entities_v1_pb.EntitiesPageReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_entities_v1_EntitiesPageRequest(arg) {
  if (!(arg instanceof entities_v1_pb.EntitiesPageRequest)) {
    throw new Error('Expected argument of type entities_v1.EntitiesPageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_entities_v1_EntitiesPageRequest(buffer_arg) {
  return entities_v1_pb.EntitiesPageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_entities_v1_EntityIdRequest(arg) {
  if (!(arg instanceof entities_v1_pb.EntityIdRequest)) {
    throw new Error('Expected argument of type entities_v1.EntityIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_entities_v1_EntityIdRequest(buffer_arg) {
  return entities_v1_pb.EntityIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_entities_v1_EntityNameRequest(arg) {
  if (!(arg instanceof entities_v1_pb.EntityNameRequest)) {
    throw new Error('Expected argument of type entities_v1.EntityNameRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_entities_v1_EntityNameRequest(buffer_arg) {
  return entities_v1_pb.EntityNameRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_entities_v1_EntityReply(arg) {
  if (!(arg instanceof entities_v1_pb.EntityReply)) {
    throw new Error('Expected argument of type entities_v1.EntityReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_entities_v1_EntityReply(buffer_arg) {
  return entities_v1_pb.EntityReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_entities_v1_EntityRequest(arg) {
  if (!(arg instanceof entities_v1_pb.EntityRequest)) {
    throw new Error('Expected argument of type entities_v1.EntityRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_entities_v1_EntityRequest(buffer_arg) {
  return entities_v1_pb.EntityRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// The Entities service definition.
var EntitiesService = exports.EntitiesService = {
  get_entities: {
    path: '/entities_v1.Entities/get_entities',
    requestStream: false,
    responseStream: false,
    requestType: entities_v1_pb.EntitiesPageRequest,
    responseType: entities_v1_pb.EntitiesPageReply,
    requestSerialize: serialize_entities_v1_EntitiesPageRequest,
    requestDeserialize: deserialize_entities_v1_EntitiesPageRequest,
    responseSerialize: serialize_entities_v1_EntitiesPageReply,
    responseDeserialize: deserialize_entities_v1_EntitiesPageReply,
  },
  get_entity_by_id: {
    path: '/entities_v1.Entities/get_entity_by_id',
    requestStream: false,
    responseStream: false,
    requestType: entities_v1_pb.EntityIdRequest,
    responseType: entities_v1_pb.EntityReply,
    requestSerialize: serialize_entities_v1_EntityIdRequest,
    requestDeserialize: deserialize_entities_v1_EntityIdRequest,
    responseSerialize: serialize_entities_v1_EntityReply,
    responseDeserialize: deserialize_entities_v1_EntityReply,
  },
  get_entity_by_name: {
    path: '/entities_v1.Entities/get_entity_by_name',
    requestStream: false,
    responseStream: false,
    requestType: entities_v1_pb.EntityNameRequest,
    responseType: entities_v1_pb.EntityReply,
    requestSerialize: serialize_entities_v1_EntityNameRequest,
    requestDeserialize: deserialize_entities_v1_EntityNameRequest,
    responseSerialize: serialize_entities_v1_EntityReply,
    responseDeserialize: deserialize_entities_v1_EntityReply,
  },
  create_entity: {
    path: '/entities_v1.Entities/create_entity',
    requestStream: false,
    responseStream: false,
    requestType: entities_v1_pb.EntityRequest,
    responseType: entities_v1_pb.EntityReply,
    requestSerialize: serialize_entities_v1_EntityRequest,
    requestDeserialize: deserialize_entities_v1_EntityRequest,
    responseSerialize: serialize_entities_v1_EntityReply,
    responseDeserialize: deserialize_entities_v1_EntityReply,
  },
  update_entity: {
    path: '/entities_v1.Entities/update_entity',
    requestStream: false,
    responseStream: false,
    requestType: entities_v1_pb.EntityRequest,
    responseType: entities_v1_pb.EntityReply,
    requestSerialize: serialize_entities_v1_EntityRequest,
    requestDeserialize: deserialize_entities_v1_EntityRequest,
    responseSerialize: serialize_entities_v1_EntityReply,
    responseDeserialize: deserialize_entities_v1_EntityReply,
  },
  delete_entity_by_id: {
    path: '/entities_v1.Entities/delete_entity_by_id',
    requestStream: false,
    responseStream: false,
    requestType: entities_v1_pb.EntityIdRequest,
    responseType: entities_v1_pb.EntityReply,
    requestSerialize: serialize_entities_v1_EntityIdRequest,
    requestDeserialize: deserialize_entities_v1_EntityIdRequest,
    responseSerialize: serialize_entities_v1_EntityReply,
    responseDeserialize: deserialize_entities_v1_EntityReply,
  },
};

exports.EntitiesClient = grpc.makeGenericClientConstructor(EntitiesService);
