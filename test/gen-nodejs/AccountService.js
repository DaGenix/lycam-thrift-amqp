//
// Autogenerated by Thrift Compiler (0.9.3)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;


var ttypes = require('./Account_types');
//HELPER FUNCTIONS AND STRUCTURES

AccountService_balance_args = function(args) {
  this.uuid = null;
  if (args) {
    if (args.uuid !== undefined && args.uuid !== null) {
      this.uuid = args.uuid;
    }
  }
};
AccountService_balance_args.prototype = {};
AccountService_balance_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.uuid = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

AccountService_balance_args.prototype.write = function(output) {
  output.writeStructBegin('AccountService_balance_args');
  if (this.uuid !== null && this.uuid !== undefined) {
    output.writeFieldBegin('uuid', Thrift.Type.STRING, 1);
    output.writeString(this.uuid);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

AccountService_balance_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = args.success;
    }
  }
};
AccountService_balance_result.prototype = {};
AccountService_balance_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.DOUBLE) {
        this.success = input.readDouble();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

AccountService_balance_result.prototype.write = function(output) {
  output.writeStructBegin('AccountService_balance_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.DOUBLE, 0);
    output.writeDouble(this.success);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

AccountServiceClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this._seqid = 0;
    this._reqs = {};
};
AccountServiceClient.prototype = {};
AccountServiceClient.prototype.seqid = function() { return this._seqid; }
AccountServiceClient.prototype.new_seqid = function() { return this._seqid += 1; }
AccountServiceClient.prototype.balance = function(uuid, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_balance(uuid);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_balance(uuid);
  }
};

AccountServiceClient.prototype.send_balance = function(uuid) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('balance', Thrift.MessageType.CALL, this.seqid());
  var args = new AccountService_balance_args();
  args.uuid = uuid;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

AccountServiceClient.prototype.recv_balance = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new AccountService_balance_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('balance failed: unknown result');
};
AccountServiceProcessor = exports.Processor = function(handler) {
  this._handler = handler
}
AccountServiceProcessor.prototype.process = function(input, output) {
  var r = input.readMessageBegin();
  if (this['process_' + r.fname]) {
    return this['process_' + r.fname].call(this, r.rseqid, input, output);
  } else {
    input.skip(Thrift.Type.STRUCT);
    input.readMessageEnd();
    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
    output.writeMessageBegin(r.fname, Thrift.MessageType.EXCEPTION, r.rseqid);
    x.write(output);
    output.writeMessageEnd();
    output.flush();
  }
}

AccountServiceProcessor.prototype.process_balance = function(seqid, input, output) {
  var args = new AccountService_balance_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.balance.length === 1) {
    Q.fcall(this._handler.balance, args.uuid)
      .then(function(result) {
        var result = new AccountService_balance_result({success: result});
        output.writeMessageBegin("balance", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("balance", Thrift.MessageType.EXCEPTION, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.balance(args.uuid, function (err, result) {
      if (err == null) {
        var result = new AccountService_balance_result((err != null ? err : {success: result}));
        output.writeMessageBegin("balance", Thrift.MessageType.REPLY, seqid);
      } else {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("balance", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}
