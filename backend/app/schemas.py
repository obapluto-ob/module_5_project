from flask_marshmallow import Marshmallow
from marshmallow import fields

ma = Marshmallow()


class UserSchema(ma.Schema):
    id = fields.Int()
    name = fields.Str()
    email = fields.Str()
    role = fields.Str()


class JobSchema(ma.Schema):
    id = fields.Int()
    title = fields.Str()
    description = fields.Str()
    salary = fields.Str()
    location = fields.Str()
    job_type = fields.Str()
    created_at = fields.DateTime()
    company_name = fields.Method("get_company_name")

    def get_company_name(self, obj):
        return obj.company.name if obj.company else None


class ApplicationSchema(ma.Schema):
    id = fields.Int()
    status = fields.Str()
    applied_at = fields.DateTime()
    cover_letter = fields.Str()
    job_title = fields.Method("get_job_title")
    company_name = fields.Method("get_company_name")

    def get_job_title(self, obj):
        return obj.job.title

    def get_company_name(self, obj):
        return obj.job.company.name if obj.job.company else None


class SavedJobSchema(ma.Schema):
    id = fields.Int()
    job_id = fields.Int()
    job_title = fields.Method("get_job_title")
    company_name = fields.Method("get_company_name")
    location = fields.Method("get_location")

    def get_job_title(self, obj):
        return obj.job.title

    def get_company_name(self, obj):
        return obj.job.company.name if obj.job.company else None

    def get_location(self, obj):
        return obj.job.location


user_schema = UserSchema()
job_schema = JobSchema()
jobs_schema = JobSchema(many=True)
application_schema = ApplicationSchema()
applications_schema = ApplicationSchema(many=True)
saved_job_schema = SavedJobSchema()
saved_jobs_schema = SavedJobSchema(many=True)
