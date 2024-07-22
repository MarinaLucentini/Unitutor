package marinalucentini.Unitutor.community.repositories;

import marinalucentini.Unitutor.community.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CommentRepository extends JpaRepository<Comment, UUID> {
    Page<Comment> findByPostId(UUID postId, Pageable pageable);
}
