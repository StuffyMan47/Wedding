namespace Domain.Common;

abstract class AuditableEntity : BaseEntity
{
    public DateTime CreateDate { get; set; }
    public DateTime? ModifyDate { get; set; }
}
